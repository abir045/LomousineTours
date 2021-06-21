FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

FilePond.setOptions({
  stylePanelAspectRatio: 600 / 400,
  imageResizeTargetWidth: 400,
  imageResizetargetHeight: 600,
});

FilePond.parse(document.body);
