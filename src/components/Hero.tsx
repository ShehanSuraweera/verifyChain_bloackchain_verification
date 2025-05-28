import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Upload, Search, AlertCircle } from "lucide-react";
import UploadModal from "./UploadModal";
import { useState } from "react";
import VerifyModal from "./VerifyModal";
import { CardanoWallet, useWallet } from "@meshsdk/react";

const Hero = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const { connected } = useWallet(); // Get wallet connection status

  const handleUploadClick = () => {
    if (!connected) {
      return; // Just as a safety measure
    }
    setUploadModalOpen(true);
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4">
            🚀 Now with Cardano blockchain verification
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Secure Document
            <span className="text-blue-600 block">Verification System</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Upload, issue, and verify certificates, news articles, and official
            documents with enterprise-grade security and blockchain-powered
            authenticity guarantees.
          </p>
        </div>
        {/* <div className="my-10 text-center">
          <CardanoWallet
            onConnected={() => {
              console.log("you are connnected");
            }}
          />
        </div> */}

        <div className="my-10 text-center">
          <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
                  Connect Your Wallet
                </div>
                <p className="mt-2 text-gray-500">
                  Connect your Cardano wallet to interact with VeryChain &
                  explore amazing features.
                </p>

                <div className="mt-6">
                  <CardanoWallet
                    onConnected={() =>
                      console.log("Wallet connected successfully!")
                    }
                  />
                </div>

                <div className="mt-4 text-xs text-gray-400">
                  We support Nami, Eternl, Flint, Yoroi, Lace and other major
                  Cardano wallets
                </div>
              </div>
            </div>
          </div>
        </div>

        {!connected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto mb-6 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="text-yellow-700">
              Please connect your wallet to upload documents
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            onClick={handleUploadClick}
            disabled={!connected}
          >
            <Upload className="mr-2 h-5 w-5" />
            {connected ? "Upload Document" : "Connect Wallet to Upload"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 border-blue-200 hover:bg-blue-50"
            onClick={() => setVerifyModalOpen(true)}
          >
            <Search className="mr-2 h-5 w-5" />
            Verify Document
          </Button>
        </div>

        {/* Rest of your component remains the same */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Upload</h3>
                <p className="text-gray-600 text-sm">
                  Securely upload documents
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <FileCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Verify</h3>
                <p className="text-gray-600 text-sm">
                  Instant authenticity check
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <Search className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Search</h3>
                <p className="text-gray-600 text-sm">Find documents quickly</p>
              </div>
            </div>
          </div>
        </div>
        <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
        <VerifyModal open={verifyModalOpen} onOpenChange={setVerifyModalOpen} />
      </div>
    </section>
  );
};

export default Hero;
