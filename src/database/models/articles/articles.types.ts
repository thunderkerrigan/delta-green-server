import { Document, Model } from "mongoose";
export interface IArticle {
  _id: string;
  content: Object;
  createdAt: Date;
  updatedAt: Date;
}
export interface IArticleDocument extends IArticle, Omit<Document, "_id"> {}
export interface IArticleModel extends Model<IArticleDocument> {
  findOrCreateArticle: (id: string) => Promise<IArticleDocument>;
}
