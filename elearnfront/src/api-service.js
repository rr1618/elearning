import axios from "axios";
export default class API{
    static loginUser(body){
        var res = axios.create({baseURL: "http://localhost:8000/"})
      .post("auth/", {
        username: body.username,
        password: body.password
      })
        return  res
    }

    static registerUser(body){
        var res = axios.create({baseURL: "http://127.0.0.1:8000/"})
      .post("perfectcourses/users/", body)
        return  res
    }
    static fetchCourse()
    {
        var res = axios.create({baseURL: "http://127.0.0.1:8000/"})
        .get('perfectcourses/course/')
        return res
    }
    static fetchDetailCourse(course_id)
    {

        var url ='perfectcourses/courseDetail/'+course_id+'/course_details'
        console.log(url)
        var res = axios.create({baseURL: "http://127.0.0.1:8000/"})
            .get(url)
        return res
    }

}

