async function seedAdmin() {
  const hashed = await bcrypt.hash("123123123", 10);

  const user = await User.findOne({ email: "user9@test.com" });

  if (user) {
    user.password = hashed;
    user.role = "admin"; 
    await user.save();

    return console.log("Admin updated");
  }

  await User.create({
    name: "Admin",
    email: "user9@test.com",
    password: hashed,
    role: "admin"
  });

  console.log("Admin created");
}