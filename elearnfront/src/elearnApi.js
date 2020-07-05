import axios from "axios";
export default class ElearnApi{
    static AddCourse(body){
        console.log("here")
        var res = axios.create({baseURL: "http://localhost:8000/elearning/"})
      .post("course/", {
        title: body.title
      })
        return res

    }
    static AddLesson(body){
        console.log("here")
        var res = axios.create({baseURL: "http://localhost:8000/elearning/"})
      .post("lesson/", {
        course: body.courseid,
        section: body.sectionid,
        lesson: body.lessontxt,
        lessonText: body.lessondesc,
        videolink: body.video

      })
        return res

    }
    static AddSection(body){
        console.log("here")
        var res = axios.create({baseURL: "http://localhost:8000/elearning/"})
      .post("section/", {
        section: body.section,
          course: body.course
      })
        return res

    }
    static fetchAllCourse()
    {
        var res = axios.create({baseURL: "http://127.0.0.1:8000/"})
        .get('elearning/course/')
        return res
    }
    static fetchSectionLessons(courseid,sectionid)
    {
        var res = axios.create({baseURL: "http://127.0.0.1:8000/"})
        .get(`elearning/lesson/?course=${courseid}&section=${sectionid}`)
        return res
    }
    static fetchCourse(courseid,sectionid)
    {
        var res = axios.create({baseURL: "http://127.0.0.1:8000/"})
        .get(`elearning/section/?course=${courseid}&section=${sectionid}`)
        return res
    }
    static fetchSection(courseid)
    {
        var res = axios.create({baseURL: "http://127.0.0.1:8000/"})
        .get(`elearning/section/?course=${courseid}`)
        return res
    }

}