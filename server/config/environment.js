// creo constante con los dos entornos
const environments = {
  "production": 'production',
  "development": 'development'
};

const ENV = process.env.NODE_ENV || environments.development;

const config = {
  [environments.production]: {
    PORT: 80,
    JWT_SECRET: `Xdk-$12$Ur!luhLjOGzIYJUS7&_%ajmFmcycwN*a=5DeRci%eiCNYnU!Fny=Fm@3&_JRqdsfa3=1HhNbtMeGCk3MCauA=vimJ2sVoPMVGETojWmFbP266?Z^CanZ1*14R@uU@hsfQ!59#U+Trfmt+#6i9nL08B6+kyCPHb3R%x8SY1sIHlxHa$IX9ux3xTplj!$|03&0l3Ak^||P!xcSdE$v+p6S8Wmkg9IsF^Zw^bJnDCRab97z2CcQ#kUEf2*&Qm4aMsz1?n&q_LpQMnVQsC1&l_CnNS2$dB-gBBL9u+yu+6i8jaibiuybVU_BLPWaY0sxCPW2Ec^QRqcn0c#CDBkwNB4SUHzYj-aS3D5|LTdEwgdiVW_=^62ao0|5gfxGACS0tvCTLq!9=u073uvrmSq!Qc5kl0p*#qmI!l+8VXIf|rF3-s61F-e5UZ1Hq#aFj0ujXHo@c?g2XxKdl|$WVCT7x1jIGSW6pOQwt8#GQcTg06_@HAUEdjEn%EKA+`
  },
  [environments.development]: {
    PORT: 8080,
    JWT_SECRET: `Xdk-$12$Ur!luhLjOGzIYJUS7&_%ajmFmcycwN*a=5DeRci%eiCNYnU!Fny=Fm@3&_JRqdsfa3=1HhNbtMeGCk3MCauA=vimJ2sVoPMVGETojWmFbP266?Z^CanZ1*14R@uU@hsfQ!59#U+Trfmt+#6i9nL08B6+kyCPHb3R%x8SY1sIHlxHa$IX9ux3xTplj!$|03&0l3Ak^||P!xcSdE$v+p6S8Wmkg9IsF^Zw^bJnDCRab97z2CcQ#kUEf2*&Qm4aMsz1?n&q_LpQMnVQsC1&l_CnNS2$dB-gBBL9u+yu+6i8jaibiuybVU_BLPWaY0sxCPW2Ec^QRqcn0c#CDBkwNB4SUHzYj-aS3D5|LTdEwgdiVW_=^62ao0|5gfxGACS0tvCTLq!9=u073uvrmSq!Qc5kl0p*#qmI!l+8VXIf|rF3-s61F-e5UZ1Hq#aFj0ujXHo@c?g2XxKdl|$WVCT7x1jIGSW6pOQwt8#GQcTg06_@HAUEdjEn%EKA+`
  }
};

const CONFIG = config[ENV];

if (!CONFIG) throw new Error(`Invalid NODE_ENV=${ENV}`);

process.env = {
  ...process.env,
  ...CONFIG
};
