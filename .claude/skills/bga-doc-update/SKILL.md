---
name: bga-doc-update
description: Updates the help pages of the extension on the BGA wiki (en.doc / fr.doc .boardgamearena.com/ChromeExtension) with the Playwright MCP - compares them with the current code, writes the new wikitext, retakes the outdated screenshots, shows a preview for validation, then publishes after the user's approval. Use when the user asks to update the documentation / help pages / wiki of the extension.
---

# Help pages of the extension on the BGA wiki

Pages: `https://en.doc.boardgamearena.com/ChromeExtension` and `https://fr.doc.boardgamearena.com/ChromeExtension`, linked from `src/locales/*.json` (ca, de, es use the English page; the `ja` page is not handled by this skill).

**Nothing is published before the explicit approval of the user in step 5.** The wiki is public: a saved edit or an uploaded image is visible at once. Work files go in `temp/wiki/` (ignored by git).

## 1. Prerequisites

- `yarn dev` running and the Playwright MCP (`local/playwright-mcp.json`, loads `build/dev`), as for the `bga-new-games` skill; its window is visible, the user follows the preview there.
- Logged in on each wiki: open `https://{lang}.doc.boardgamearena.com/index.php?title=ChromeExtension&action=edit` and check `mw.config.get('wgUserName')` (`browser_evaluate`). If it is `null`, ask the user to log in in the Playwright window. Never type credentials.

## 2. Snapshot of the pages

For `en` and `fr`, save the source and the last revision (`curl -s -A "Mozilla/5.0"`):

- `index.php?title=ChromeExtension&action=raw` → `temp/wiki/{lang}/current.wiki`
- `api.php?action=query&prop=revisions&titles=ChromeExtension&rvlimit=1&rvprop=ids|timestamp|user&format=json` → `temp/wiki/{lang}/rev.json`
- the images of the page: `api.php?action=query&titles=ChromeExtension&generator=images&gimlimit=max&prop=imageinfo&iiprop=url|size&format=json` → `temp/wiki/{lang}/images.json`, and download each one in `temp/wiki/{lang}/images/old/`. The `descriptionurl` tells on which wiki the file lives (upload it there in step 6).

## 3. Analysis

Compare the pages with the code, not with the changelog (it has no content):

- the changes since the last revision: `git log --since={timestamp of rev.json}`;
- the settings: sections and switches of `src/js/ui/views/OptionsView.tsx` (some only on desktop, Chrome or Firefox: say it in the text), tabs of `src/js/ui/options/index.tsx` and `src/js/ui/App.tsx`, popup views in `src/js/ui/views/`;
- the features in the pages of BGA: `src/js/ui/content/` (dark mode menu `darkMode/ModeSelector.tsx`, side menu, floating menu, forum folders, hidden games, muted players…);
- the advanced home page: the ids of `src/js/config/configuration.constants.ts`;
- the errors of the page itself (duplicated sections, broken sentences, typos, broken markup).

Also give your opinion as a reader of the page, in a separate list of suggestions: what is unclear or too technical for a player, missing explanations (e.g. a setting whose effect isn't obvious), order and grouping of the sections, a missing introduction or table of contents, too long or redundant passages, images that would help or are useless. Each suggestion in one line with its reason; they are only applied if the user accepts them.

Present the list of the differences to the user (what is wrong, missing, outdated, and the screenshots to retake), then the suggestions, and agree on the scope before writing.

## 4. New version

### Text

Write `temp/wiki/{lang}/new.wiki` for each language:

- Keep the structure, the tone and the sections that are still right; change only what the analysis found. Same content in both languages.
- Name the settings with the exact texts of the extension: `src/locales/en.json` for the English page, `src/locales/fr.json` for the French one.
- French: full accents and typography; wiki syntax of the French page (`Fichier:`, `néant`, `vignette`). Fix the typos you meet and list them.
- Check that the markup is balanced (`<nowiki>`, tables `{| |}`, lists).
- Write the new text in parts (`head.part`, the unchanged long sections copied with `sed -n` from `current.wiki`, `tail.part`) concatenated into `new.wiki`. The "blank" lines of a preformatted block (lines starting with a space, e.g. the CSS example) are a single space: the Write tool drops it and the block is split; check them (`diff` of the block with `current.wiki`). Write files with LF line endings (Python on Windows writes CRLF unless `newline=''`).
- Two headings with the same text give the same anchor: keep the titles unique.
- A small image floated on the left (`left|thumb` / `gauche|vignette`) with a short text lets the next heading or image climb next to it: end its text with `<br clear="all" />`, and check these sections on a screenshot of the preview.

### Screenshots

Retake every screenshot whose content changed (settings sections, popup, menus…), in the language of the page, keeping the file name (it becomes a new version of the same file):

- Pages of the extension: the id is listed in `chrome://extensions` (`extensions-manager` → `extensions-item-list` → `extensions-item`, shadow roots; `serviceWorkers()` doesn't list it), the page paths in `build/dev/manifest.json` (hashed names: popup, `options_ui`). Open them as `chrome-extension://{id}/{page}`; for the popup, set a viewport of its real size (500 px wide).
- Configuration: first save the whole storage of the extension (`chrome.storage.sync.get(null)` and `local`, from an extension page) to `temp/wiki/storage-backup.json`; set the settings needed for the screenshots with `chrome.storage.sync.set` (`locale`, `trackTables`, `hidden`…, keys in `src/js/config/configuration.ts`) and reload the page; at the end, `chrome.storage.sync.clear()` then set the backup again, and check it is identical.
- Settings sections: click each `.options-frame` (they open one at a time), wait until it loses `.reduced`, then a page screenshot clipped around it with a margin (its title sticks out above the frame). `browser_run_code_unsafe` has no `require`: put the reusable snippets in `temp/wiki/*.js` and run them with `filename`.
- An empty popup (no game in progress) shows nothing: fake the user's own table with `context.route('**/tablemanager/tablemanager/tableinfos.html?status=play*')`, built from a real table of the friends' search (format) with the user as only player (no other player's name), and `unrouteAll` at the end.
- Pages of BGA: their texts follow the language of the BGA account (not the extension). An image of a BGA page whose look didn't change is kept (it would only exist in one language); crop the elements of the extension so that they don't include BGA texts in the wrong language.
- Screenshot only the element shown (`locator.screenshot()`), at a size close to the old image (`images.json`), in the mode of the old image (light or dark). No personal data beyond what the old image showed: hide or avoid other players' names, private messages, the list of friends.
- Save them in `temp/wiki/{lang}/images/new/` with the exact file name of the wiki.
- A new feature worth an image gets a new file, named like the others (`… en.png` / `… fr.png`): check on the wiki that the name is free.

## 5. Validation (nothing is saved)

For each language, in its own tab of the Playwright window:

**Before any preview**, block the images that will be replaced (`page.context().route('**/images/**/{name}*', r => r.abort())` for each replaced file, removed with `unroute` before the publication): the preview would generate their thumbnails from the old files, and Cloudflare would keep these old thumbnails for 4 hours after the upload (it happened on the first update: fixed by changing the display size `480x480px` → `490x490px`, which gives new thumbnail URLs).

1. `node .claude/skills/bga-doc-update/make-fill.js temp/wiki/{lang}/new.wiki "<edit summary>"` (short summary in the language of the page, without any mention of Claude).
2. Open `https://{lang}.doc.boardgamearena.com/index.php?title=ChromeExtension&action=edit` (when leaving a filled form, accept the `beforeunload` dialog with `browser_handle_dialog`), then `browser_run_code_unsafe` with `filename: temp/wiki/{lang}/fill.js`: it returns the length of the text put in the form, check it against the file.
3. Click "Show changes" (`#wpDiff`): screenshot of the diff (`temp/wiki/{lang}/diff.png`).
4. Click "Show preview" (`#wpPreview`): screenshot of `#wikiPreview` (`temp/wiki/{lang}/preview.png`), and list the red links (`#wikiPreview a.new`): only the new images may be missing. The preview still shows the old images.
5. Write `temp/wiki/review.html`: for each image, the old and the new one side by side, with its name and its language. The Playwright MCP blocks `file:`: give its path to the user, who opens it in their browser.

Then show the user, in the chat: the summary of the changes per section, the typos fixed, the edit summaries, the list of images (retaken, new, unchanged), and the paths of `preview.png`, `diff.png` and `review.html` (the preview stays open in the Playwright window). Ask with `AskUserQuestion`: publish everything, publish only one language, or change something.

On a requested change: edit `new.wiki` or the image, and redo step 5 (reload the edit page, don't reuse the old form).

## 6. Publication (after approval only)

1. Check that nobody edited the page meanwhile: fetch `rev.json` again; if the revision changed, stop, show the user the new revision and go back to step 3.
2. Images first (the page must not show a missing image): for each one, open `https://{wiki of the file}/index.php?title=Special:Upload&wpDestFile={name}&wpForReupload=1`, choose the file (`browser_file_upload` with an absolute path), the same short summary, and submit. On a warning page (duplicate, overwrite), read it: confirm only an overwrite of the expected file. A new file: plain `Special:Upload`, with a short description.
3. Page: reload the edit page, `fill.js` again, check the length, click "Save changes" (`#wpSave`). On an edit conflict or an error, stop and show it to the user.

## 7. Check

- Fetch `action=raw` again and compare with `new.wiki` (identical, except trailing newlines).
- Screenshot of the published page, check that the new images show (purge the cache with `?action=purge` if an old one remains). The thumbnails (`/images/thumb/…/480px-…`) go through Cloudflare (`cache-control: max-age=14400`): an old thumbnail can stay up to 4 hours, the purge doesn't clear it. Check the origin with a cache buster (`?nocache=…`, `cf-cache-status: MISS`, size of the PNG) and tell the user about the delay.
- Report: the published revisions (links to the history), the uploaded images, what was left out. Don't commit.
