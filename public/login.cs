using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void btnSignIn_Click(object sender, EventArgs e)
    {
        string email = signInEmail.Value;
        string password = signInPassword.Value;

        // Check if email and password are valid
        if (IsValidEmail(email) && IsValidPassword(password))
        {
            string connectionString = ConfigurationManager.ConnectionStrings["Server=localhost\SQLEXPRESS;Database=CCSE;Trusted_Connection=True;"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                // Check if email and password match a user in the User database
                SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM Users WHERE Email = @Email AND Password = @Password", connection);
                command.Parameters.AddWithValue("@Email", email);
                command.Parameters.AddWithValue("@Password", password);
                int count = (int)command.ExecuteScalar();

                if (count == 1)
                {
                    // Login successful, redirect to the main page - needs changing
                    Response.Redirect("MainPage.aspx");
                }
                else
                {
                    // Login failed, display error message
                    formMessageInit("error", "Invalid email or password");
                }
            }
        }
        else
        {
            // Email or password is invalid, display error message
            formMessageInit("error", "Invalid email or password");
        }
    }

    protected void btnSignUp_Click(object sender, EventArgs e)
    {
        
        string email = signupEmail.Value;
        string password = signupPassword1.Value;

        // Check if Email, email, and password are valid
        if (IsValidEmail(email) && IsValidPassword(password))
        {
            string connectionString = ConfigurationManager.ConnectionStrings[].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                // Check if email is already in use
                SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM Users WHERE Email = @Email", connection);
                command.Parameters.AddWithValue("@Email", email);
                int count = (int)command.ExecuteScalar();

                if (count == 0)
                {
                    // Insert new user into the database
                    command = new SqlCommand("INSERT INTO Users (Email, Password) VALUES (@Email, @Password)", connection);
                    
                    command.Parameters.AddWithValue("@Email", email);
                    command.Parameters.AddWithValue("@Password", password);
                    command.ExecuteNonQuery();

                    // Account creation successful, display success message
                    formMessageInit("success", "Account created successfully!");
                }
                else
                {
                    // Email already in use, display error message
                    formMessageInit("error", "Email is already in use");
                }
            }
        }
        else
        {
            // Invalid email or password, display error message
            formMessageInit("error", "Invalid email, or password");
        }
    }

    private bool IsValidEmail(string Email)
    {
        // Check if Email is not empty
        return !string.IsNullOrWhiteSpace(Email);
    }

    private bool IsValidEmail(string email)
    {
        // Check if email is not empty and has a valid format
        return !string.IsNullOrWhiteSpace(email) && new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(email);
    }

    private bool IsValidPassword(string password)
    {
        // Check if password is at least 6 characters long
        return !string.IsNullOrWhiteSpace(password) && password.Length >= 6;
    }

}