import fse from "fs-extra";
import { Module } from "../../interfaces/Module"
import path from "path";
import { getComponentsFromModules } from "../utils/getComponentsFromModules.js"
import { getHooksFromComponents } from "../utils/getHooksFromComponents.js"
import { getRoutesFromComponents } from "../utils/getRoutesFromComponents.js"

export const getComponents = (
	modules: string[],
	isEVM: boolean,
	useBackend: boolean
) => {
	
	const components = getComponentsFromModules(modules)
	console.log(components)
	for (const component of components) {
		const fromComponentPath = path.join(
			process.cwd(),
			"templates",
			isEVM ? "evm" : "solana",
			"components",
			`${component + ".jsx"}`
		);

		let toComponentPath = "";
		if (useBackend) {
			toComponentPath = path.join(process.cwd(), "frontend", "pages", "components", `${component + ".jsx"}`);
		} else {
			toComponentPath = path.join(process.cwd(), "pages", "components", `${component + ".jsx"}`);
		}
		fse.copySync(fromComponentPath, toComponentPath);

		const fromComponentStylePath = path.join(
			process.cwd(),
			"templates",
			isEVM ? "evm" : "solana",
			"components",
			`${component.charAt(0).toUpperCase() + component.slice(1)}.module.css`
		)
		let toComponentStylePath = "";
		if (useBackend) {
			toComponentStylePath = path.join(process.cwd(),"frontend", "styles", `${component.charAt(0).toUpperCase() + component.slice(1)}.module.css`);
		} else {
			toComponentStylePath = path.join(process.cwd(), "styles", `${component.charAt(0).toUpperCase() + component.slice(1)}.module.css`);
		}
		fse.copySync(fromComponentStylePath, toComponentStylePath);
	}

	const hooks = getHooksFromComponents(components)

	if (hooks.length > 0) {
		for (const hook of hooks) {
			const fromHookPath = path.join(
				process.cwd(),
				"templates",
				"hooks",
				`${hook + ".js"}`
			);
	
			let toHookPath = "";
			if (useBackend) {
				toHookPath = path.join(process.cwd(),"frontend", "hooks", `${hook + ".js"}`);
			} else {
				toHookPath = path.join(process.cwd(), "hooks", `${hook + ".js"}`);
			}
			fse.copySync(fromHookPath, toHookPath);
		}
	}
	const routes = getRoutesFromComponents(components)

	if (routes.length > 0) {
		for (const route of routes) {
			const fromRoutePath = path.join(
				process.cwd(),
				"templates",
				isEVM ? "evm" : "solana",
				"components",
				`${route}`
			);
	
			let toRoutePath = "";
			if (useBackend) {
				toRoutePath = path.join(process.cwd(),"frontend", "pages", `${route}`);
			} else {
				toRoutePath = path.join(process.cwd(), "pages", `${route}`);			}
			fse.copySync(fromRoutePath, toRoutePath);
		

		const fromComponentStylePath = path.join(
			process.cwd(),
			"templates",
			isEVM ? "evm" : "solana",
			"components",
			`${route.charAt(0).toUpperCase() + route.slice(1)}.module.css`
		)
		let toComponentStylePath = "";
		if (useBackend) {
			toComponentStylePath = path.join(process.cwd(),"frontend", "styles", `${route.charAt(0).toUpperCase() + route.slice(1)}.module.css`);
		} else {
			toComponentStylePath = path.join(process.cwd(), "styles", `${route.charAt(0).toUpperCase() + route.slice(1)}.module.css`);
		}
			fse.copySync(fromComponentStylePath, toComponentStylePath);
		}
	}
	
};
