import * as path from "path";
import { tryResolvePackage } from "./helpers";
import * as utils from "./utils";
/* eslint-disable @typescript-eslint/no-var-requires */

export let controllerCommonModulesInternal: any;

function resolveControllerTools(): any | never {
	// Attempt 1: Resolve @iobroker/js-controller-common from here - JS-Controller 4.1+
	let importPath = tryResolvePackage(["@iobroker/js-controller-common"]);
	if (importPath) {
		try {
			controllerCommonModulesInternal = require(importPath);
			const { tools } = controllerCommonModulesInternal;
			if (tools) return tools;
		} catch {
			// did not work, continue
		}
	}

	// Attempt 2: Resolve @iobroker/js-controller-common in JS-Controller dir - JS-Controller 4.1+
	importPath = tryResolvePackage(
		["@iobroker/js-controller-common"],
		[path.join(utils.controllerDir, "node_modules")],
	);
	if (importPath) {
		try {
			controllerCommonModulesInternal = require(importPath);
			const { tools } = controllerCommonModulesInternal;
			if (tools) return tools;
		} catch {
			// did not work, continue
		}
	}

	// Attempt 3: Legacy resolve - until JS-Controller 4.0
	importPath = path.join(utils.controllerDir, "lib");
	try {
		// This was a default export prior to the TS migration
		const tools = require(path.join(importPath, "tools"));
		if (tools) return tools;
	} catch {
		// did not work, continue
	}

	throw new Error("Cannot resolve tools module");
	//return process.exit(10);
}

/** The collection of utility functions in JS-Controller, formerly `lib/tools.js` */
export const controllerToolsInternal = resolveControllerTools();

// Export a subset of the utilties in controllerTools

/**
 * Resolve a module that is either exported by @iobroker/js-controller-common (new controllers) or located in in the controller's `lib` directory (old controllers).
 * @param name - The filename of the module to resolve
 * @param exportName - The name under which the module may be exported. Defaults to `name`.
 */
export function resolveNamedModule(
	name: string,
	exportName: string = name,
): any {
	// The requested module might be moved to @iobroker/js-controller-common and exported from there
	if (controllerCommonModulesInternal?.[exportName])
		return controllerCommonModulesInternal[exportName];

	// Otherwise it was not moved yet, or we're dealing with JS-Controller <= 4.0

	// Attempt 1: JS-Controller 4.1+
	let importPath = path.join(utils.controllerDir, "build/lib", name);
	try {
		// This was a default export prior to the TS migration
		const module = require(importPath);
		if (module) return module;
	} catch {
		// did not work, continue
	}

	// Attempt 2: JS-Controller 5.1+
	importPath = path.join(utils.controllerDir, "build/cjs/lib", name);
	try {
		// This was a default export prior to the TS migration
		const module = require(importPath);
		if (module) return module;
	} catch {
		// did not work, continue
	}

	// Attempt 2: JS-Controller <= 4.0
	importPath = path.join(utils.controllerDir, "lib", name);
	try {
		// This was a default export prior to the TS migration
		const module = require(importPath);
		if (module) return module;
	} catch {
		// did not work, continue
	}

	throw new Error(`Cannot resolve JS-Controller module ${name}.js`);
	//return process.exit(10);
}

// TODO: Import types from @iobroker/js-controller-common and iobroker.js-controller

/**
 * Converts a pattern to match object IDs into a RegEx string that can be used in `new RegExp(...)`
 * @param pattern The pattern to convert
 * @returns The RegEx string
 */
function pattern2RegEx(pattern: string): string {
	return controllerToolsInternal.pattern2RegEx(pattern);
}

/**
 * Finds the adapter directory of a given adapter
 *
 * @param adapter name of the adapter, e.g. hm-rpc
 * @returns path to adapter directory or null if no directory found
 */
function getAdapterDir(adapter: string): string | null {
	return controllerToolsInternal.getAdapterDir(adapter);
}

export interface InstalledInfo {
	controller?: boolean;
	version?: string;
	icon?: string;
	title?: string;
	titleLang?: ioBroker.Translated;
	desc?: ioBroker.Translated;
	platform?: string;
	keywords?: string[];
	readme?: string;
	runningVersion?: string;
	license?: string;
	licenseUrl?: string;
}

/**
 * Get list of all installed adapters and controller version on this host
 * @param hostJsControllerVersion Version of the running js-controller, will be included in the returned information if provided
 * @returns object containing information about installed host
 */
function getInstalledInfo(
	hostJsControllerVersion?: string,
): Record<string, InstalledInfo> {
	return controllerToolsInternal.getInstalledInfo(hostJsControllerVersion);
}

/**
 * Checks if we are running inside a docker container
 */
function isDocker(): boolean {
	return controllerToolsInternal.isDocker();
}

export const commonTools = {
	pattern2RegEx,
	getAdapterDir,
	getInstalledInfo,
	isDocker,
	// TODO: Add more methods from lib/tools.js as needed

	password: resolveNamedModule("password"),
	session: resolveNamedModule("session"),
	zipFiles: resolveNamedModule("zipFiles"),
	// TODO: expose more (internal) controller modules as needed
};
