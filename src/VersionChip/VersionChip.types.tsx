export type VersionChipProps = {
    /**
     * The version change type.
     */
    versionType: "major" | "minor";
    /**
     * The version number in a format `major.minor`.
     */
    version: string;
    /**
     * Flag denoting wether version is selected.
     */
    selected: boolean
}