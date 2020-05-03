/* eslint-disable @typescript-eslint/class-name-casing */

// This was extracted from https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/lib/exitCodes.js
// Keep this in sync when a new exit code is added

export type ExitCodes = Readonly<{
	NO_ERROR: number;
	JS_CONTROLLER_STOPPED: number;
	INVALID_ADAPTER_CONFIG: number;
	NO_ADAPTER_CONFIG_FOUND: number;
	INVALID_CONFIG_OBJECT: number;
	INVALID_ADAPTER_ID: number;
	UNCAUGHT_EXCEPTION: number;
	ADAPTER_ALREADY_RUNNING: number;
	INSTANCE_IS_DISABLED: number;
	CANNOT_GZIP_DIRECTORY: number;
	CANNOT_FIND_ADAPTER_DIR: number;
	ADAPTER_REQUESTED_TERMINATION: number;
	UNKNOWN_PACKET_NAME: number;
	ADAPTER_REQUESTED_REBUILD: number;
	CANNOT_READ_INSTANCES: number;
	NO_MULTIPLE_INSTANCES_ALLOWED: number;
	NO_MULTIPLE_INSTANCES_ALLOWED_ON_HOST: number;
	NO_CONNECTION_TO_OBJ_DB: number;
	NO_CONNECTION_TO_STATES_DB: number;
	INSTANCE_ALREADY_EXISTS: number;
	CANNOT_INSTALL_NPM_PACKET: number;
	CANNOT_EXTRACT_FROM_ZIP: number;
	INVALID_IO_PACKAGE_JSON: number;
	CANNOT_COPY_DIR: number;
	MISSING_ADAPTER_FILES: number;
	INVALID_NPM_VERSION: number;
	INVALID_NODE_VERSION: number;
	INVALID_OS: number;
	INVALID_DEPENDENCY_VERSION: number;
	INVALID_ARGUMENTS: number;
	INVALID_PASSWORD: number;
	MISSING_CONFIG_JSON: number;
	CANNOT_DELETE_NON_DELETABLE: number;
	CANNOT_GET_STATES: number;
	CANNOT_GET_REPO_LIST: number;
	START_IMMEDIATELY_AFTER_STOP: number;
}>;
