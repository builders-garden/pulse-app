export type NeynarResponse = {
  fid: string;
  signer_uuid: string;
  is_authenticated: boolean;
};
export type SignerResponse = {
  result: {
    user: {
      createdAt: string;
      fid: string;
      updatedAt: string;
    };
    token: string;
  };
};
export type TokenResponse = {
  result: {
    token: string;
  };
};
