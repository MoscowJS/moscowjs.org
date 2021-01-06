import { CompanyData } from "./company.h"
import { SpeakerData } from "./speaker.h"

export type OrgData = {
  Display_name: string
  Speaker: { data: SpeakerData }
  Company: Array<{ data: CompanyData }>
  Telegram: string
  Email: string
}
