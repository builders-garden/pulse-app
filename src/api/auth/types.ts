export type Signer = {
  result: {
    public_key: string;
    signer_approval_url: string;
    signer_uuid: string;
    status: string;
    token?: string;
  };
};
