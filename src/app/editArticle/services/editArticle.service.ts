import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticleInputInterface } from "src/app/shared/types/articleInput.interface";
import { SaveArticleResponseInterface } from "src/app/shared/types/saveArticleResponse.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`

    return this.http
      .put<SaveArticleResponseInterface>(fullUrl, {article: articleInput})
      .pipe(map((response: SaveArticleResponseInterface) => response.article))
  }
}