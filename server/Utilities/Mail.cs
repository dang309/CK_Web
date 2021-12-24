using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

using dotenv.net;

namespace server.Utilities
{
    public class Mail
    {

        public Mail()
        {
            DotEnv.Load(options: new DotEnvOptions(ignoreExceptions: false, envFilePaths: new[] { "../.env" }));
        }
        public static void SendMail(string to, string subject, string body)
        {
            using (MailMessage mail = new MailMessage())
            {
                var envVars = DotEnv.Read();
                mail.From = new MailAddress(envVars["EMAIL_USERNAME"]);
                mail.To.Add(to);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {

                    smtp.Credentials = new NetworkCredential(envVars["EMAIL_USERNAME"], envVars["EMAIL_PASSWORD"]);
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }
        }
    }
}