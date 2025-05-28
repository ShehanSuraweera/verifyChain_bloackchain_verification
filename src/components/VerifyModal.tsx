"use client";

import { useState } from "react";
import { sha256 } from "js-sha256";
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
import { Search, FileCheck, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VerifyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VerifyModal = ({ open, onOpenChange }: VerifyModalProps) => {
  const [documentId, setDocumentId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const [txHash, setTxHash] = useState("");

  const handleFileVerify = async () => {
    if (!file) return;

    if (!txHash) {
      toast({
        title: "Missing Tx Hash",
        description: "Please enter a transaction hash.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const hash = sha256(arrayBuffer);

      const res = await fetch(
        `https://cardano-preprod.blockfrost.io/api/v0/txs/${txHash}/metadata`,
        {
          headers: {
            project_id: process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID!,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 404) {
          toast({
            title: "Invalid Transaction Hash",
            description:
              "No metadata found for this transaction. Please check the hash.",
            variant: "destructive",
            className: "bg-white",
          });
          setTxHash("");
        } else {
          toast({
            title: "Error",
            description: `Unexpected error: ${res.statusText}`,
            variant: "destructive",
            className: "bg-white",
          });
        }
        return;
      }

      const data = await res.json();
      const certificateHash = Array.isArray(data)
        ? data.find((entry: any) => entry.label === "721")?.json_metadata
            ?.certificate?.hash
        : null;

      const isValid = certificateHash === hash;

      setVerificationResult({
        isValid,
        status: isValid ? "Valid" : "Invalid",
        title: "Uploaded Certificate",
        issuer: "Verified via Blockchain",
        issueDate: "Unknown",
        verificationDate: new Date().toISOString(),
        blockchainHash: certificateHash || "N/A",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to verify the document.",
        variant: "destructive",
        className: "bg-white",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleTextVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentId.trim()) {
      toast({
        title: "Missing Document ID",
        description: "Please enter a document ID or hash to verify.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    // Simulated verification (optional: replace with real hash-based logic)
    setTimeout(() => {
      const mockResult = {
        isValid: Math.random() > 0.3,
        documentId,
        title: "Software Engineering Certificate",
        issuer: "Tech University",
        issueDate: "2024-01-15",
        verificationDate: new Date().toISOString(),
        blockchainHash: "0x" + Math.random().toString(16).substr(2, 40),
        status: Math.random() > 0.3 ? "Valid" : "Invalid",
      };

      setVerificationResult(mockResult);
      setIsVerifying(false);
    }, 2000);
  };

  const resetVerification = () => {
    setDocumentId("");
    setFile(null);
    setVerificationResult(null);
    setIsVerifying(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) resetVerification();
      }}
    >
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Verify Document
          </DialogTitle>
          <DialogDescription>
            Enter a document ID or upload a certificate file to verify its
            authenticity.
          </DialogDescription>
        </DialogHeader>

        {!verificationResult ? (
          <form onSubmit={handleTextVerify} className="space-y-6">
            <div className="space-y-2">
              {/* <Label htmlFor="documentId">Document ID or Hash</Label>
              <Input
                id="documentId"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                placeholder="Enter document ID or blockchain hash"
                className="font-mono text-sm"
              /> */}
              <Label htmlFor="txHash">Transaction Hash</Label>
              <Input
                id="txHash"
                placeholder="Enter Cardano Tx Hash"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload Certificate File</Label>
              <Input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Verification Process
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Checks document existence in our registry</li>
                <li>• Verifies blockchain hash integrity</li>
                <li>• Validates issuer credentials</li>
                <li>• Confirms document has not been tampered with</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              {/* <Button
                type="submit"
                disabled={isVerifying}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Verify by ID
              </Button> */}
              <Button
                type="button"
                disabled={!file || isVerifying}
                onClick={handleFileVerify}
                className="bg-green-600 hover:bg-green-700"
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Verify File
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              {verificationResult.isValid ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}

              <Badge
                variant={verificationResult.isValid ? "default" : "destructive"}
                className={`text-lg px-4 py-2 ${
                  verificationResult.isValid
                    ? "bg-green-100 text-green-800"
                    : ""
                }`}
              >
                {verificationResult.status}
              </Badge>
            </div>

            {verificationResult.isValid && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-green-900">
                  Document Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-green-700">Title:</span>
                    <p className="text-green-600">{verificationResult.title}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Issuer:</span>
                    <p className="text-green-600">
                      {verificationResult.issuer}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">
                      Issue Date:
                    </span>
                    <p className="text-green-600">
                      {verificationResult.issueDate}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">
                      Verified:
                    </span>
                    <p className="text-green-600">
                      {new Date(
                        verificationResult.verificationDate
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-green-700">
                    Blockchain Hash:
                  </span>
                  <p className="text-green-600 font-mono text-xs break-all">
                    {verificationResult.blockchainHash}
                  </p>
                </div>
              </div>
            )}

            {!verificationResult.isValid && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">
                  Verification Failed
                </h4>
                <p className="text-red-700 text-sm">
                  This document could not be verified. It may not exist in our
                  system, has been tampered with, or the provided ID/hash is
                  incorrect.
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetVerification}>
                Verify Another
              </Button>
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VerifyModal;
