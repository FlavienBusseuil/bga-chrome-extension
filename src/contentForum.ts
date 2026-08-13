import Configuration from "./js/config/configuration";
import { setStyle } from "./js/ui/content/darkMode/darkStyleForumFunctions";
import { changeDarkColors } from "./js/ui/content/darkMode/darkColors";
import { i18n } from "./js/utils/browser/i18n";

let windowLoaded = false;
let configLoaded = false;

const sendForumLoaded = () => {
  if (windowLoaded && configLoaded) {
    // hack to avoid default theme flashing
    setTimeout(() => {
      chrome.runtime.sendMessage({ to: 'MAIN_PAGE', payload: { key: 'bga_ext_forum_visible' } });
    }, 200);
  }
};

window.addEventListener("load", () => {
  windowLoaded = true;
  sendForumLoaded();
})

const adjustDarkColors = () => {
  const hue = config.getDarkModeColor('forum');
  const saturation = config.getDarkModeSaturation('forum');

  changeDarkColors(hue, saturation);
};

const getDarkStyle = () => {
  const darkMode = config.isDarkMode();
  const nativeDarkMode = config.isDarkModeNative();

  if (darkMode && nativeDarkMode) {
    return 'native';
  }
  if (darkMode) {
    return 'on';
  }
  return 'off';
};

const initPage = () => {
  document.documentElement.classList.add('bgaext_forum');

  const darkStyle = getDarkStyle();
  setStyle(darkStyle, config);
  adjustDarkColors();

  if (config.isSolidBackground()) {
    document.documentElement.classList.add('bgaext_solid_back');
  }

  configLoaded = true;
  sendForumLoaded();

  let _manageMutationTimeout: any = 0;

  const observer = new MutationObserver(() => {
    if (_manageMutationTimeout) {
      clearTimeout(_manageMutationTimeout);
    }
    _manageMutationTimeout = setTimeout(_manageMutation, 100);
  });
  observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
};

const _manageMutation = () => {
  _manageHtmlTag();
  _manageFoldersLinks();
};

const _manageHtmlTag = () => {
  const style = getDarkStyle();

  if (style === 'native') {
    localStorage.setItem('bga-theme', 'dark');
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
  } else {
    localStorage.setItem('bga-theme', 'light');
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
  }
};

const _createFolderConfigInput = () => {
  if (document.querySelector('#bgaext_folder_config')) {
    return;
  }

  const searchBox = document.querySelector('#search-box');

  if (!searchBox?.parentElement) {
    return;
  }

  const configInputArea = document.createElement('div');
  configInputArea.id = 'bgaext_folder_config';
  configInputArea.title = `${i18n('folderConfigTitle')}\n${i18n('deleteGameText2')}`;

  const configInput = document.createElement('input');
  configInput.type = 'checkbox';
  configInput.id = 'bgaext_folder_config_input';

  const configLabel = document.createElement('label');
  configLabel.innerHTML = `${i18n('folderConfigInput')} <i class="icon fa-question-circle fa-fw"></i>`;
  configLabel.htmlFor = 'bgaext_folder_config_input';

  configInputArea.appendChild(configInput);
  configInputArea.appendChild(configLabel);

  searchBox.parentElement.insertBefore(configInputArea, searchBox);

  configInput.addEventListener('change', () => {
    if (configInput.checked) {
      document.documentElement.classList.add('bgaext_folder_config');
    } else {
      document.documentElement.classList.remove('bgaext_folder_config');
    }
  });
};

const _manageFoldersLinks = () => {
  const foldersLink = Array.from(document.querySelectorAll('.forumtitle[href*="?f="]'));

  if (foldersLink.length) {
    _createFolderConfigInput();

    const hiddenFolders = new Set(config.getHiddenFolders());

    foldersLink.forEach((el) => {
      const link = el as HTMLAnchorElement;
      const folderId = parseInt(link.href.split('?f=')[1] || '', 10);
      const row = link.closest('.row') as HTMLDivElement;

      if (folderId && !row.dataset.visible) {
        let folderVisibility = !hiddenFolders.has(folderId);
        row.dataset.visible = folderVisibility.toString();

        const parentDiv = link.parentElement as HTMLDivElement;
        const eyeIcon = document.createElement('a');
        eyeIcon.className = 'folder_config_link';
        eyeIcon.innerHTML = folderVisibility ? '<i class="fa fa-eye-slash"></i>' : '<i class="fa fa-eye"></i>';

        eyeIcon.addEventListener('click', () => {
          folderVisibility = !folderVisibility;
          row.dataset.visible = folderVisibility.toString();
          eyeIcon.innerHTML = folderVisibility ? '<i class="fa fa-eye-slash"></i>' : '<i class="fa fa-eye"></i>';
          config.changeFolderVisibility(folderId, folderVisibility);
        });

        parentDiv.insertBefore(eyeIcon, link.nextSibling);
      }
    });
  }
};

document.addEventListener('bga_ext_update_config', (data) => {
  const key = (data as CustomEvent).detail.key as string;

  switch (key) {
    case 'darkModeColor':
    case 'darkModeSat':
      adjustDarkColors();
      break;
    case 'darkMode':
    case 'darkModeNative':
      const darkStyle = getDarkStyle();
      setStyle(darkStyle, config);
      break;
  }
});

const config = new Configuration();
config.init().then(initPage);