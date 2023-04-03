import Page from "../models/Page";

export const validatePageExists = async (page: string): Promise<boolean | undefined | null> => {
  try {
    return await Page.findOne({ title: page })
  } catch (error) {
    console.log(error);
  }
}