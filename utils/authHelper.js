import bcrypt from 'bcrypt'
import chalk from 'chalk'

export const hashPassword = async (password) => {

    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    }
    catch (err) {
        console.log(chalk.red(err))
    }
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}