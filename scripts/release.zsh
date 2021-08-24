# Previous TAG
PREVIOUS_TAG=v$(node scripts/getVersion.js);
# Set a new version number and create a github tag
yarn version;
# Update the version number in manifest
node scripts/updateManifestVersionFromPackage.js;
# Set a new TAG name from version number
TAG=v$(node scripts/getVersion.js);
# production build
yarn build;
# zip
zip -r builds/build-$TAG.zip build;
# commit changes
git add package.json;
git add src/manifest.json;
git commit -m 'Update version';
git push;
# push Github tag
git push --tags
# create a new release
# gren release --tags $TAG;
# create and push a changelog
# gren changelog --override;
# git add CHANGELOG.md;
# git commit -m 'Update Changelog';
# git push