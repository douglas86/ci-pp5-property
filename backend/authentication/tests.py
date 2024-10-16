from django.test import TestCase, Client


# Create your tests here.
class TestUser(TestCase):
    """
    Test if user can register, login, logout and change password
    """

    def setUp(self):
        """
        Set up the client for the test database
        """

        self.client = Client()

    def register_user(self):
        """
        Register user
        """

        response = self.client.post("/auth/registration/",
                                    {'username': 'testing', 'password1': 'IAMininGLOrN', 'password2': 'IAMininGLOrN'
                                     })

        return response

    def login_user(self):
        """
        Login user
        """

        self.register_user()
        user = self.client.post("/auth/login/", {'username': 'testing', 'password': 'IAMininGLOrN'})
        return user

    def test_register_user(self):
        """
        Test register user
        """

        print("Registering User")

        response = self.register_user()
        self.assertEqual(response.status_code, 201)

    def test_login_user(self):
        """
        Test login user
        """

        print("Login User")

        user = self.login_user()
        self.assertEqual(user.status_code, 200)

    def test_logout_user(self):
        """
        Test logout user
        """

        print("Logout User")

        user = self.login_user()
        self.assertEqual(user.status_code, 200)
        response = self.client.post("/auth/logout/")
        self.assertEqual(response.status_code, 200)

    def test_change_password(self):
        """
        Test change password
        """

        print("Change Password")

        register_user = self.register_user()
        self.assertEqual(register_user.status_code, 201)
        change_password = self.client.post("/auth/change_password/",
                                           {
                                               'username': 'testing',
                                               'old_password': 'IAMininGLOrN',
                                               'new_password': 'MininGLOrN'
                                           })

        self.assertEqual(change_password.status_code, 200)