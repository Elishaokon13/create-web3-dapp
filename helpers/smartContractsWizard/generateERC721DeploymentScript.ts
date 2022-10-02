export const generateERC721DeploymentScript = (name: string) => {
	return `
const hre = require("hardhat");

async function main() {
	const Contract = await hre.ethers.getContractFactory("${name}");
	const contract = await Contract.deploy();

	await contract.deployed();

	console.log("${name} deployed to:", contract.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
`.trim();
};
