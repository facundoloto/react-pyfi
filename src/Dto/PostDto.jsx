export default class PostDto {
    constructor(id, idUser, name, imageUser, description, img, created) {
        this.id = id;
        this.id_user = idUser;
        this.name = name;
        this.image_user = imageUser;
        this.description = description;
        this.img = img;
        this.created = created;
    }
}