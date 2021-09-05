import { Document, Schema } from "mongoose";
import { IArticleDocument } from "./articles.types";

const ArticleSchema = new Schema<IArticleDocument>(
  {
    _id: { type: String, required: true },
    content: Object,
  },
  { timestamps: true }
);

const defaultValue = "";

ArticleSchema.statics.findOrCreateArticle = async function (id: string) {
  const document = await this.findById(id);
  if (document) {
    return document;
  }
  return await this.create({ _id: id, content: defaultValue });
};

export default ArticleSchema;
