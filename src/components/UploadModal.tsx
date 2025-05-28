import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  FileCheck,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@meshsdk/react";
import { Transaction } from "@meshsdk/core";
import { sha256 } from "js-sha256";
import { generatePDFCertificate } from "@/lib/functions";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadModal = ({ open, onOpenChange }: UploadModalProps) => {
  const { wallet } = useWallet();
  const [documentType, setDocumentType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setHash("");
      setTxHash("");
      setError("");
      setUploadSuccess(false);
    }
  };

  const resetForm = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setDocumentType("");
    setTitle("");
    setDescription("");
    setFile(null);
    setHash("");
    setTxHash("");
    setError("");
    setUploadSuccess(false);
    setPdfUrl(null);
  };

  const hashAndSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentType || !title || !file) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a file.",
        variant: "destructive",
        className: "bg-white",
      });
      return;
    }

    if (!file || !wallet) {
      setError("Please connect your wallet and upload a file.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1. Hash the file
      const arrayBuffer = await file.arrayBuffer();
      const fileHash = sha256(arrayBuffer);
      setHash(fileHash);

      // 2. Create transaction
      const tx = new Transaction({ initiator: wallet });

      // You must send at least 1 ADA or 1 Lovelace output, so dummy send to self
      const usedAddress = await wallet.getChangeAddress();
      tx.sendLovelace(usedAddress, "1000000"); // 1 ADA (in Lovelace)

      // 3. Set metadata (label 721 is common for NFTs, but you can use any label)
      tx.setMetadata(721, {
        certificate: {
          hash: fileHash,
        },
      });

      // 4. Build, sign and submit transaction
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

      setTxHash(txHash);
      setUploadSuccess(true);

      // 5. Generate and download certificate
      // Generate certificate data
      const certificateData = {
        fileName: file.name,
        title,
        documentType,
        fileHash,
        txHash,
        timestamp: new Date().toISOString(),
        walletAddress: usedAddress,
        explorerUrl: `https://verifychain.vercel.app`, // Adjust for your blockchain
      };

      // Generate PDF certificate
      const pdfBytes = await generatePDFCertificate(certificateData);

      // Create URL for the certificate
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      toast({
        title: "Upload Successful",
        description: `${title} has been uploaded. View transaction hash below.`,
        className: "bg-white",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Transaction failed.";
      console.error(err);
      setError(errorMessage);
      toast({
        title: "Upload Failed",
        description: errorMessage || "Transaction failed.",
        variant: "destructive",
        className: "bg-white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) resetForm();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Upload Document
          </DialogTitle>
          <DialogDescription>
            Upload and issue certificates, news articles, or official documents
            with blockchain verification.
          </DialogDescription>
        </DialogHeader>

        {!uploadSuccess ? (
          <form onSubmit={hashAndSend} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type *</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="news">News Article</SelectItem>
                    <SelectItem value="official">Official Document</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Document Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter document title"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter document description (optional)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload File *</Label>
              <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </p>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Upload & Verify
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <Badge
                variant="default"
                className="text-lg px-4 py-2 bg-green-100 text-green-800"
              >
                Upload Successful
              </Badge>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-green-900">Document Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-green-700">Title:</span>
                  <p className="text-green-600">{title}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Type:</span>
                  <p className="text-green-600 capitalize">{documentType}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">
                    Description:
                  </span>
                  <p className="text-green-600">
                    {description || "No description"}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-green-700">File:</span>
                  <p className="text-green-600">{file?.name}</p>
                </div>
              </div>
              <div>
                <span className="font-medium text-green-700">
                  Document Hash:
                </span>
                <p className="text-green-600 font-mono text-xs break-all">
                  {hash}
                </p>
              </div>
              <div>
                <span className="font-medium text-green-700">
                  Transaction Hash:
                </span>
                <p className="text-green-600 font-mono text-xs break-all">
                  {txHash}
                </p>
                {/* <a
                  href={`https://preview.cexplorer.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View on Cardano Explorer
                </a> */}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Important Verification Notice
              </h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start gap-2">
                  •{" "}
                  <span>
                    Please{" "}
                    <strong>
                      save both the Document Hash and Transaction Hash
                    </strong>{" "}
                    for future verification
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  •{" "}
                  <span>
                    These hashes are your <strong>proof of authenticity</strong>{" "}
                    and cannot be recovered if lost
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  •{" "}
                  <span>
                    To verify later, you&apos;ll need either:
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>
                        - The original file <strong>+</strong> Transaction Hash
                      </li>
                      <li>
                        - Or the Document Hash <strong>+</strong> Transaction
                        Hash
                      </li>
                    </ul>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  •{" "}
                  <span>
                    Consider saving this information in multiple secure
                    locations
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex justify-end space-x-2">
              {/* Add this in your success section, near the other buttons */}
              {pdfUrl && (
                <Button
                  onClick={() => {
                    const downloadLink = document.createElement("a");
                    downloadLink.href = pdfUrl;
                    downloadLink.download = `Certificate_${title.replace(
                      /\s+/g,
                      "_"
                    )}.pdf`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
              )}
              <Button
                onClick={resetForm}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Upload Another
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
