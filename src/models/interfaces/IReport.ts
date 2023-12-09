import type { ReportStatus, ReportType, ReportContentType } from '../../templates/classic/constants/enums';

interface IReport {
  id: string;
  reporter_id: string;
  reported_id: string;
  status: ReportStatus;
  type: ReportType;
  content_type: ReportContentType;
  description: string;
  images?: string[] | null;
  created_date: Date;
}

export default IReport;
