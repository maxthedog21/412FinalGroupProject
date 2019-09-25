<%-- 
    Document   : index
    Created on : Sep 14, 2019, 11:00:17 AM
    Author     : ligth
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
        <style>
            td{
               padding: 10px; 
            }
            div{
                width: 80%;
                border: 2px solid black;
                border-radius: 45px;
                background-color: green; 
                page-break-inside: auto;
                 
            }
        </style>
      
    </head>
    <body>
    <center><h1><u>MVA Game</u</h1>
    </center>
    <center>
        <div>
            <form action="login" method="POST">
            <table>
                <tr>
                    <td>Username</td>
                    <td><input type="text" class="form-control" name="username" placeholder="Username"></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" class="form-control" name="password" placeholder="Password"></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center"><input class="btn btn-success" type="submit" value="Submit"></td>
                </tr>
            </table>
          </form>
        </div>  
    </center>
     
</body>
</html>
