import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "https://patryk-jobly-backend-4938d35eb531.herokuapp.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // COMPANIES
  /** Get a lif of all companies */
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Add company */
  static async addCompany(data) {
    let res = await this.request(`companies`, data, "post");
    return res.company;
  }

  /** Update company */
  static async updateCompany(handle, data) {
    let res = await this.request(`companies/${handle}`, data, "patch");
    return res.company;
  }

  /** Delete company */
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, "delete");
    return res.message;
  }

  // JOBS
  /** Get a list of all jobs */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** Get details on a job by id. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Add job */
  static async addJob(data) {
    let res = await this.request(`jobs`, data, "post");
    return res.job;
  }

  /** Update job */
  static async updateJob(id, data) {
    let res = await this.request(`jobs/${id}`, data, "patch");
    return res.job;
  }

  /** Delete job */
  static async deleteJob(id) {
    let res = await this.request(`jobs/${id}`, {}, "delete");
    return res.message;
  }

  // USERS
  /** Get a list of all users */
  static async getUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  /** Get details on a user by username. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user */
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Delete user */
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res.message;
  }

  /** Apply to a job */
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.message;
  }

  /** Unapply to a job */
  static async unapplyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "delete");
    return res.message
  }

  // SEARCH
  /** Search for companies and jobs */
  static async search(query) {
    // first search for companies
    let res = await this.request(`companies`, { name: query });
    let companies = res.companies;
    // then search for jobs
    res = await this.request(`jobs`, { title: query });
    let jobs = res.jobs;
    return { companies, jobs };
  }

  // APPLICATIONS
  /** Get a list of all applications for a user */
  static async getApplications(username) {
    let res = await this.request(`users/${username}`);
    let applications = res.user.applications;
    let jobs = []

    for (let jobId of applications) {
      let job = await this.getJob(jobId);
      jobs.push(job);
    }
    return jobs;
  }

  // AUTHENTICATION
  /** Log in a user */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Sign up a user */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
}

export default JoblyApi;