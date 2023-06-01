const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const saltRounds = 16
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

const compareSyncPassword = (password, hashedPassword) => {
    const match = bcrypt.compareSync(password, hashedPassword)
    return match
}

module.exports = { hashPassword, compareSyncPassword }