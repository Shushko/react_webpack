export const DEVICE_SIZES = {
  mobile: 567,
  tablet: 768,
  tabletLarge: 992,
  desktop: 1200,
  desktopLarge: 1440
};

export const DEVICE = {
  mobile: `(max-width: ${DEVICE_SIZES.mobile}px)`,
  tablet: `(max-width: ${DEVICE_SIZES.tablet}px)`,
  tabletLarge: `(max-width: ${DEVICE_SIZES.tabletLarge}px)`,
  desktop: `(max-width: ${DEVICE_SIZES.desktop}px)`,
  desktopLarge: `(max-width: ${DEVICE_SIZES.desktopLarge}px)`
};
