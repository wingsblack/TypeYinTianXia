using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.IO;
using System.Text.RegularExpressions;
using System.Collections;

/// <summary>
/// java 的摘要说明
/// </summary>
public class javaTmplate : IHttpHandler, IRequiresSessionState
{

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }



    private Hashtable map;


    javaTmplate() {
        this.map = new Hashtable();



        this.map.Add("staticPrefix", "templates");
    }

    public void ProcessRequest(HttpContext context)
    {

        string html = File.ReadAllText(context.Server.MapPath("./index3.html"));

        html = Regex.Replace(html, "<%.+%>", "");


        html = Regex.Replace(html, "\\$\\{(\\w+)}", new MatchEvaluator((Match t) => {
            string key = t.Groups[1].ToString();
            string value = this.map[key].ToString();
            return value;
        }));

        context.RewritePath("/js/emotion_data.js");

        return;

        context.Response.Write(html);

    }
}