const { userAgent: ua } = navigator

export const safari = /^(?=.*(?:safari))(^(?!.*(chrome|chromium)).*$)$/i.test(ua)
