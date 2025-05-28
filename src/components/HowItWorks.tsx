import { Card } from "@/components/ui/card";
import {
  FileText,
  ShieldCheck,
  Link,
  Cpu,
  Key,
  Database,
  Upload,
} from "lucide-react";

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 mt-5">
          How Our Verification System Works
        </h2>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-8 bg-white">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              In Simple Terms
            </h3>
            <p className="text-gray-600">
              Think of our system like a notary public for the digital age. When
              you upload a document, we create a unique digital fingerprint
              (hash) and store it permanently on the Cardano blockchain. Later,
              anyone can verify the document by checking if its fingerprint
              matches the one on the blockchain.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    1. You Upload a Document
                  </h3>
                  <p className="text-gray-600 text-sm">
                    This could be a certificate, contract, or any important
                    file. The document stays private - we only store its digital
                    fingerprint.
                  </p>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Cpu className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    2. We Create a Digital Fingerprint
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our system generates a unique code (hash) that represents
                    your document. Even a tiny change creates a completely
                    different code.
                  </p>
                </div>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Link className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    3. We Record It on Cardano Blockchain
                  </h3>
                  <p className="text-gray-600 text-sm">
                    The fingerprint is stored on Cardano&apos;s secure,
                    decentralized network. This creates permanent proof that
                    your document existed at that exact time.
                  </p>
                </div>
              </div>
            </Card>

            {/* Step 4 */}
            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    4. Anyone Can Verify Authenticity
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Later, you or others can verify the document by comparing
                    its current fingerprint with the one stored on the
                    blockchain.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Blockchain Explanation */}
          <Card className="p-6 mt-8 bg-white">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
              <Database className="h-5 w-5" />
              What is Blockchain?
            </h3>
            <p className="text-gray-600 mb-4">
              A blockchain is like a digital ledger that&apos;s maintained by
              thousands of computers worldwide. It&apos;s:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-sm">
                  ✓
                </span>
                <span>
                  <strong>Tamper-proof</strong> - Once data is recorded, it
                  cannot be changed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-sm">
                  ✓
                </span>
                <span>
                  <strong>Decentralized</strong> - No single company or
                  government controls it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-sm">
                  ✓
                </span>
                <span>
                  <strong>Transparent</strong> - Anyone can verify the
                  information
                </span>
              </li>
            </ul>
          </Card>

          {/* Wallet Explanation */}
          <Card className="p-6 mt-6 bg-white">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
              <Key className="h-5 w-5" />
              Why Do I Need a Wallet?
            </h3>
            <p className="text-gray-600 mb-4">
              Your Cardano wallet acts like your digital identity card for
              blockchain transactions:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center">
                    1
                  </span>
                  Identity Verification
                </h4>
                <p className="text-sm text-gray-600">
                  It proves you&apos;re authorized to submit documents without
                  revealing your personal information.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center">
                    2
                  </span>
                  Transaction Signing
                </h4>
                <p className="text-sm text-gray-600">
                  It securely approves adding your document&apos;s fingerprint
                  to the blockchain.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Note: The wallet only signs transactions - we never access your
              funds or require any payments.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
