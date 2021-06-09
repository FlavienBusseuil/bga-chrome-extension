# Previous TAG
PREVIOUS_TAG=v$(node scripts/getVersion.js);
# Set a new version number
yarn version;
# Update the version number in manifest
node scripts/updateManifestVersionFromPackage.js;
# Set a new TAG name from version number
TAG=v$(node scripts/getVersion.js);
# production build
yarn build;
# zip
zip builds/build-$TAG.zip build;
# Create and push a Github TAG
git tag $TAG
git push orgin master --tags
# commit changes
git add package.json;
git add src/manifest.jon;
git commit -m 'Update version';
git push;
# create a new release
gren release --tags $TAG..$PREVIOUS_TAG;
# create and push a changelog
gren changelog --override;
git add CHANGELOG.md;
git commit -m 'Update Changelog';
git push