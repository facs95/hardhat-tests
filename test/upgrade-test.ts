import { expect } from "chai";
import { upgrades, ethers } from "hardhat";

describe("Upgradable", function () {
  before("Get factories", async function () {
    this.Mars = await ethers.getContractFactory("Mars");
    this.MarsV2 = await ethers.getContractFactory("MarsV2");
  });

  it("Should return contracts name", async function () {
    this.mars = await upgrades.deployProxy(this.Mars);
    await this.mars.deployed()
    console.log("Proxy contract deployed address:", this.mars.address)
    expect(await this.mars.name()).to.equal("Mars");
  });

  it("Should upgrade contract and return new version", async function () {
    const marsV2 = await upgrades.upgradeProxy(this.mars, this.MarsV2);
    await marsV2.deployed()
    console.info("upgraded transaction hash: ", marsV2.deployTransaction.hash)
    const marsVersion = await marsV2.version()
    expect(marsVersion).to.equal("v2");
  });
});
