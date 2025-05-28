"use client"; // for Next.js App Router
import { useState } from "react";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Transaction } from "@meshsdk/core";
import { sha256 } from "js-sha256";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { wallet, connected } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setHash("");
      setTxHash("");
      setError("");
    }
  };

  const hashAndSend = async () => {
    console.log("clicked");
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
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Certificate</h2>
      <input
        placeholder="upload certificate"
        type="file"
        onChange={handleFileChange}
      />

      <div className="mb-20">
        <CardanoWallet />
      </div>
      <button
        onClick={hashAndSend}
        disabled={!connected || loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload to Cardano"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {hash && (
        <p className="mt-2">
          Hash: <code>{hash}</code>
        </p>
      )}
      {txHash && (
        <p className="mt-2">
          ✅ Uploaded! View on{" "}
          <a
            href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            Cardanoscan
          </a>
        </p>
      )}

      <button
        onClick={() => {
          router.push("verify");
        }}
      >
        verify page
      </button>
    </div>
  );
}
