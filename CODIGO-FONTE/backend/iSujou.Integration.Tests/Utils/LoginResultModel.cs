﻿using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Integration.Tests.Utils
{
    public class LoginResultModel
    {
        public bool authenticated { get; set; }
        public DateTime created { get; set; }
        public DateTime expiration { get; set; }
        public string accessToken { get; set; }
        public string message { get; set; }
    }
}
