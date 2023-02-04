User.create!(username: 'user@test.com', password: Digest::SHA1.hexdigest('123test'))
