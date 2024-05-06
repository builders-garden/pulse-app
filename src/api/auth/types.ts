export type NeynarResponse = {
  fid: string;
  signer_uuid: string;
  is_authenticated: boolean;
};
export type SignerResponse = {
  result: {
    createdAt: string;
    fid: string;
    updatedAt: string;
  };
};
export type TokenResponse = {
  result: {
    token: string;
  };
};
