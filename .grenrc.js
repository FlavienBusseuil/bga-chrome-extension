module.exports = {
  dataSource: "issues",
  ignoreLabels: ["question"],
  ignoreIssuesWith: ["question"],
  groupBy: {
    Enhancements: ["enhancement"],
    "Bug Fixes": ["bug"],
    Chore: ["chore", "documentation"],
  },
  changelogFilename: "CHANGELOG.md",
};
