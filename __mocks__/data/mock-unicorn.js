import { MockRole } from "./mock-role"

export const MockUnicorn = {
  name: "Joe",
  id: "joe",
  description: "Exists",
  color: "red",
  fields: {
    isAuthor: true
  },
  roles: [MockRole],
  socials: {
    twitter: "twtrusrname",
    github: "ghusrname",
    website: "example.com"
  },
  pronouns: {
    they: "they",
    them: "them",
    their: "their",
    theirs: "theirs",
    themselves: "themselves",
  },
  profileImg: {
    childImageSharp: {
      smallPic: {
        fixed: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      },
      mediumPic: {
        fixed: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      },
      bigPic: {
        fixed: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      }
    }
  }
}