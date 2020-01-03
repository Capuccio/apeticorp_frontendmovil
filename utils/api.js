const BASE_API = "https://apeticorp-backend.herokuapp.com/";

class Api {
  createHeader(data) {
    let header = {
      method: data.method,
      body: JSON.stringify(data.body),
      headers: {
        "Content-Type": data.content
      }
    };
    return header;
  }

  async userLogin(data) {
    const ans = await fetch(
      `${BASE_API}login`,
      this.createHeader({
        method: "POST",
        body: data,
        content: "application/json"
      })
    );
    const answer = await ans.json();
    return answer;
  }

  async userRegister(data) {
    const ans = await fetch(
      `${BASE_API}register`,
      this.createHeader({
        method: "POST",
        body: data,
        content: "application/json"
      })
    );
    const answer = await ans.json();
    return answer;
  }

  async getReferredUsers(data) {
    const ans = await fetch(
      `${BASE_API}referredusers/${data}`,
      this.createHeader({
        method: "GET",
        content: "application/json"
      })
    );
    const answer = await ans.json();
    return answer;
  }

  async getAllPosts(data) {
    const ans = await fetch(
      `${BASE_API}posts/${data}`,
      this.createHeader({ method: "GET", content: "application/json" })
    );
    const answer = await ans.json();
    return answer;
  }

  async getUserData(data) {
    const ans = await fetch(`${BASE_API}user/${data}`);
    const answer = await ans.json();
    return answer;
  }

  async createPosts(data) {
    const ans = await fetch(
      `${BASE_API}createposts`,
      this.createHeader({
        method: "POST",
        body: data,
        content: "application/json"
      })
    );
    const answer = await ans.json();
    return answer;
  }

  async getPostComments(data) {
    const ans = await fetch(`${BASE_API}postcomments/${data}`);
    const answer = await ans.json();
    return answer;
  }

  async commentPost(data) {
    const ans = await fetch(
      `${BASE_API}commentpost`,
      this.createHeader({
        method: "POST",
        body: data,
        content: "application/json"
      })
    );
    const answer = ans.json();
    return answer;
  }

  async likePost(data) {
    const ans = await fetch(
      `${BASE_API}likepost`,
      this.createHeader({
        method: "POST",
        body: data,
        content: "application/json"
      })
    );
    const answer = ans.json();
    return answer;
  }

  async updateUser(data) {
    const ans = await fetch(
      `${BASE_API}update`,
      this.createHeader({
        method: "POST",
        body: data,
        content: "application/json"
      })
    );
    const answer = ans.json();
    return answer;
  }

  async exchangePoints(data) {
    const ans = await fetch(`${BASE_API}exchange/${data}`);
    const answer = await ans.json();
    return answer;
  }

  async getNotifications(data) {
    const ans = await fetch(`${BASE_API}notifications/${data}`);
    const answer = await ans.json();
    return answer;
  }
}

export default new Api();
