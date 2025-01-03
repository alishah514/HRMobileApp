import Constants from '../common/Constants';

export const isSizeValid = file => {
  const imageSizeInMB = file.size / (1024 * 1024);
  return imageSizeInMB <= Constants.MAX_FILE_SIZE_MB;
};
