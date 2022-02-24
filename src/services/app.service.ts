class AppService {
    adminData() {
        return "This text can only be read by admins";
    }

    protectedData() {
        return "This text can only be read by users with verified email";
    }

    guestData() {
        return "This text can be read by all registered users";
    }

    pulbicData() {
        return "This text can be read by anyone";
    }

    homePage() {
        return "<h1>Hello World!</h1>";
    }
}

export default new AppService();
