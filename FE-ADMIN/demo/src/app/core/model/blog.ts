export class Blog {
  id: number;
  title: string;
  image?: string;
  description: string;
  shortDescription: string
  author: string;

  constructor() {
    this.id = 0
    this.title = '';
    this.image = '';
    this.description=  '';
    this.shortDescription= '';
    this.author=  '';
  }

}
