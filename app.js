const ethers = require("ethers");

const signMessage = async () => {
  try {
    const ethersProvider = new ethers.getDefaultProvider(
      "https://ethereum-sepolia.publicnode.com/"
    );

    try {
      const wallet = new ethers.Wallet(
        "23ed90d3d54a61712ef49a83b8f216d85b203b131b954315625aee4a74ec7cdd",
        ethersProvider
      );

      const domain = {
        name: "marketPlace",
        version: "1",
        chainId: "0xaa36a7",
        verifyingContract: "0x9864f56c3f5c2dd5ed118b93e8412143e39881d8",
      };

      const types = {
        primaryBuy: [
          { name: "nftAddress", type: "address" },
          { name: "seller", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "tokenId", type: "uint256" },
          { name: "pricePerShare", type: "uint256" },
          { name: "counter", type: "uint256" },
          { name: "royaltyFee", type: "uint256" },
          { name: "isPrimary", type: "bool" },
          { name: "tokenUri", type: "string" },
        ],
      };

      const data = {
        nftAddress: "0x4e8797548637f9B57cb774c5A5d967DD9a2ab256",
        seller: "0x4e8797548637f9B57cb774c5A5d967DD9a2ab256",
        amount: 1,
        tokenId: 1,
        pricePerShare: 33,
        counter: 2,
        royaltyFee: 10,
        isPrimary: true,
        tokenUri: "2", // This is a string
      };

      const signature = await wallet.signTypedData(domain, types, data);
      const expectedSignerAddress = wallet.address;
      const recoveredAddress = ethers.verifyTypedData(
        domain,
        types,
        data,
        signature
      );

      console.log(recoveredAddress === expectedSignerAddress);
    } catch (error) {
      console.log("Error:", error);
    }
  } catch (error) {
    console.log(error);
  }
};

signMessage();
