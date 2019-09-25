<%-- 
    Document   : form
    Created on : Sep 24, 2019, 2:14:28 PM
    Author     : ligth
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Form</title>
    </head>
    <body>
        <h1>SUBMIT YOUR DETAILS</h1>
        <form action="submit.jsp" method="POST">
        </form>
        <table border="1"> 
            <tbody>
                <tr>
                    <td>First Name</td>
                    <td><input type="text" name="firstname" value="" /></td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td><input type="text" name="lastname" value="" /></td>
                </tr>
                <tr>
                    <td>AGE</td>
                    <td><input type="text" name="age" value="" /></td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td><select name="gender">
                            <option>Male</option>
                            <option>Female</option>
                        </select></td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td><input type="text" name="address" value="" /></td>
                </tr>
            </tbody>
        </table>
        <input type="reset" value="RESET" />
        <input type="submit" value="SUBMIT" />
    </body>
</html>
