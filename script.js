document.addEventListener("DOMContentLoaded", function () {
  const connectWalletBtn = document.getElementById("connectWalletBtn");
  const mintNFTBtn = document.getElementById("mintNFTBtn");
  const payCryptoBtn = document.getElementById("payCryptoBtn");
  const mintStatus = document.getElementById("mintStatus");

  let provider, signer;

  // Check for MetaMask
  if (typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    mintStatus.innerText = "Please install MetaMask to use this site.";
  }

  // Connect Wallet Button
  connectWalletBtn.addEventListener("click", async () => {
    if (!provider) return;
    try {
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      connectWalletBtn.innerText = "Wallet Connected";
      mintStatus.innerText = "Connected: " + userAddress;
    } catch (error) {
      mintStatus.innerText = "Wallet connection failed: " + error.message;
    }
  });

  // Mint NFT Button
  mintNFTBtn.addEventListener("click", async () => {
    // Replace with your NFT contract's address and ABI
    const contractAddress = "0xYourNFTContractAddress";
    const contractABI = [
      // Insert your contract ABI here
    ];

    if (!signer) {
      mintStatus.innerText = "Please connect your wallet first.";
      return;
    }

    const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const tx = await nftContract.mintNFT({ value: ethers.utils.parseEther("0.05") });
      mintStatus.innerText = "Minting NFT... Transaction hash: " + tx.hash;
      await tx.wait();
      mintStatus.innerText = "NFT minted successfully!";
    } catch (error) {
      mintStatus.innerText = "Minting failed: " + error.message;
    }
  });

  // Pay with Crypto Button using Coinbase Commerce
  payCryptoBtn.addEventListener("click", () => {
    // Replace 'your-checkout-id' with your actual Coinbase Commerce Checkout ID
    CoinbaseCommerce.showCheckoutModal({ checkoutId: "your-checkout-id" });
  });
});
