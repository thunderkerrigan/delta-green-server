import { model } from "mongoose";
import { IArticleDocument, IArticleModel } from "./articles.types";
import ArticleSchema from "./articles.schema";

export const ArticleModel = model<IArticleDocument, IArticleModel>(
  "article",
  ArticleSchema
);
