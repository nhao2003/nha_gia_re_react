import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { NewsTag } from './components/NewsTag';
import { NewsPost } from './components/NewsPost';


function DetailBlog(): JSX.Element {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const newstags = [
        {
            title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất'
        },
        {
            title: 'Thị Trường BĐS Vùng Ven Đang Ấm Trở Lại'
        },
        {
            title: 'Căn Hộ Chung Cư Tiếp Tục Dẫn Sóng Thị Trường BĐS'
        },
        {
            title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất'
        },
        {
            title: 'Căn Hộ Chung Cư Tiếp Tục Dẫn Sóng Thị Trường BĐS'
        },
        {
            title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất'
        }
    ]


    const htmlContent = `  <div class="w640 fr clear">
    <div class="media VCSortableInPreviewMode">
<img fetchpriority="high" data-role="cover"
src="https://cafefcdn.com/thumb_w/640/203337114487263232/2023/12/13/avatar1702452924063-1702452924854684563328.jpg"
alt="Đất nền Cần Giờ diễn biến mới" title="Đất nền Cần Giờ diễn biến mới">
            </div>
<h2 class="sapo" data-role="sapo">
Các thông tin triển khai dự án lớn phần nào tác động đến tâm lý nhà đầu tư đang sở hữu bất động sản tại Cần Giờ (Tp.HCM). Cùng với đó,  “hàng xóm” Nhà Bè cũng rục rịch ăn theo.
</h2>



<div class="react-relate animated" id="reactRelate"></div>
<div class="clearall"></div>

<div data-check-position="body_start"></div>

<div class="contentdetail">
<div class="detail-cmain" id="mainContent">
<div class="detail-content afcbc-body" data-role="content">


                            <div class="tindnd clearfix" data-marked-zoneid="cafef_detail_relatednewsbox" >
<div id="listNewsInContent" class="clearfix">

<ul id="aiservice-lastest-news" >
</ul>
</div>
</div>


<figcaption> </figcaption> <p>  Đã từng nhiều lần giá đất Cần Giờ “nhảy múa” theo các thông tin về dự án lớn và quy hoạch. Trong đó phải kể đến thông tin về dự án khu đô thị lấn biển Cần Giờ và quy hoạch Cần Giờ lên quận giai đoạn 2025 – 2030. </p> <p>  Từ năm 2004, UBND TPHCM đã cấp phép triển khai dự án khu đô thị lấn biển Cần Giờ tại xã Long Hòa và thị trấn Cần Thạnh, do CTCP Du lịch Cần Giờ làm chủ đầu tư. Năm 2020, dự án được Thủ tướng Chính phủ phê duyệt điều chỉnh chủ trương đầu tư, mở rộng từ 600 ha thành hơn 2,800 ha, tổng mức đầu tư khủng với hơn 217 ngàn tỷ đồng. Hiện dự án vẫn đang trong quá trình triển khai. </p> <p>  Mới đây, Chủ tịch UBND Tp.HCM Phan Văn Mãi thông tin rằng, nhà đầu tư đang tiến hành các thủ tục điều chỉnh cục bộ khu đô thị lấn biển Cần Giờ. Tp.HCM yêu cầu nhà đầu tư cố gắng xong các thủ tục điều chỉnh để đến năm 2025 triển khai khởi công dự án. </p> <p>  Trước đó, đề án xây dựng Cảng trung chuyển quốc tế Cần Giờ được UBND Tp.HCM gửi Thủ tướng Chính phủ, với mục tiêu trở thành trung tâm trung chuyển quốc tế Tp.HCM và khu vực, thu hút các hãng tàu, vận tải, chủ hàng, doanh nghiệp logistics về cảng, tham gia vào chuỗi cung ứng vận tải thế giới. Khu vực cảng được đề xuất xây dựng thuộc xã Thạnh An, dự kiến đưa vào khai thác năm 2027. </p> <figure class="VCSortableInPreviewMode noCaption" type="Photo" style="">  <div>   <img alt="Đất nền Cần Giờ diễn biến mới - Ảnh 1." data-original="https://cafefcdn.com/203337114487263232/2023/12/13/1751-1702452925822-1702452926144699243872.jpeg" h="1115" rel="lightbox" src="https://cafefcdn.com/203337114487263232/2023/12/13/1751-1702452925822-1702452926144699243872.jpeg" title="Đất nền Cần Giờ diễn biến mới - Ảnh 1." type="photo" w="1507" class="" width="" height="">  </div>  <figcaption class="PhotoCMS_Caption"><p data-placeholder="Nhập chú thích ảnh" class="NLPlaceholderShow"></p></figcaption> </figure> <p>  Ngoài ra, Chủ tịch UBND Tp.HCM Phan Văn Mãi đã ký quyết định, ban hành danh mục các đề án, chương trình, kế hoạch triển khai thực hiện Nghị quyết của Ban Thường vụ Thành ủy về định hướng phát triển Cần Giờ đến năm 2030. Theo đó, Tp.HCM thực hiện trong thời gian tới phát triển Cần Giờ trở thành một trong những không gian mới, động lực mới của Tp.HCM. Mục tiêu cụ thể là đến năm 2030, Cần Giờ cơ bản trở thành thành phố nghỉ dưỡng và du lịch sinh thái chất lượng cao, có khả năng cạnh tranh ở tầm khu vực. </p> <p>  Các thông tin này lần nữa tác động đến tâm lý của nhà đầu tư khu vực. Nhất là những nhà đầu tư đã từng bỏ tiền vào bất động sản Cần Giờ trước đây. Giá đất được kỳ vọng sẽ tăng trưởng ăn theo. </p> <p>  Tuy vậy, ghi nhận cho thấy, hiện thông tin về siêu dự án hay quy hoạch gần như chưua “thẩm thấu” vào thị trường bất động sản. Dù liên tục đón nhiều thông tin mới nhưng giá nhà đất Cần Giờ không biến động. Giá hiện tại đi ngang hoặc giảm 10-20% so với thời điểm đầu năm 2022. </p> <p>  Trước đó, vào giai đoạn “sốt đất” năm 2019 - 2020, với thông tin dự án lớn được triển khai, giá đất Cần Giờ liên tục tăng, mức tăng ít nhất từ 20-25%/năm, nhiều nơi biến động tăng gần 40%. Chẳng hạn, tại khu vực thị trấn Cần Thạnh giá nhà đất từ 30-35 triệu đồng/m2 (năm 2020) đã lập mặt bằng mới lên 40-50 triệu đồng/m2 (năm 2021). Hiện tại, mức giá này đi ngang. </p> <div class="">  <div class="h-show-pc">   <div class="c-banner">    <div class="c-banner-item is-custom-size">     <div class="c-banner-item__inner">      <div class="c-banner-item__box">       <!-- markettimes.vn_Sapo -->       <ins class="adsbygoogle" data-ad-client="ca-pub-3565763552082543" data-ad-format="auto" data-ad-slot="2827862406" data-full-width-responsive="true">       </ins>             </div>     </div>    </div>   </div>   <!--end container-->  </div>  <div class="h-show-mobile">   <div class="">    <div class="c-banner">     <div class="c-banner-item is-custom-size">      <div class="c-banner-item__inner">       <div class="c-banner-item__box">        <!-- markettimes.vn_Inpage_MB -->       </div>      </div>     </div>    </div>   </div>   <!--end container-->  </div> </div> <p>  Ở một số khu vực, nhà đầu tư cần dòng tiền đang bán giá thấp hơn thị trường từ 15-30%. Tại mặt tiền đường Giồng Ao (Cần Thạnh) từng được chào giá 30 - 34 triệu đồng/m2, nay chủ nhà muốn giảm giá xuống còn khoảng 25 - 27 triệu đồng/m2. </p> <p>  Vào cuối năm 2023, thị trường nhà đất Cần Giờ vẫn xuất hiện tình trạng cắt lỗ của những nhà đầu tư ôm đất trước đó. Tuy nhiên, hiện tượng này không diễn ra trên diện rộng. Mức giá ghi nhận giảm ở các sản phẩm rao bán ngộp dao động từ 15-30%, trở về mức giá của năm 2019-2020. </p> <p>  Theo khảo sát vào tháng 11/2023, giá đất nền Cần Giờ  hiện ở mức trung bình từ 6 - 25 triệu đồng/m2. Một số khu vực thị trấn dao động 30-50 triệu đồng/m2. So với các khu vực lân cận ở Tp.HCM, giá đất nơi đây nhìn chung vẫn ở mặt bằng trung bình thấp. Các xã Lý Nhơn, Tam Thôn Hiệp, An Thới Đông, Thạnh An có nhiều nơi ghi nhận giá dưới 2 triệu đồng/m2, thậm chí có nơi giá chưa đầy 1 triệu đồng/m2, đối với đất nông nghiệp. Hầu hết xã này nằm xa trung tâm thị trấn, huyện, thuộc khu vực đảo, được bao bọc bởi các nhánh sông. </p> <p>  Một số khu vực thuộc xã An Thới Đông, Long Hòa, Cần Thạnh, Bình Khánh có giá cao hơn, từ 10 - 50 triệu đồng/m2, do những nơi này tập trung dân cư sinh sống, gần trung tâm huyện Cần Giờ hoặc gần các tuyến đường vào nội thành Sài Gòn. </p> <p>  Xã Bình Khánh, An Thới Đông thuộc 2 đảo tương đối lớn, nằm bên kia sông Nhà Bè, cách huyện Nhà Bè bởi phà Bình Khánh và phà An Thới Đông. Người dân sống tập trung quanh vùng giáp ranh nên khu này có giá cao hơn, khoảng 25 - 27 triệu đồng/m2. </p> <p>  Đường Lương Văn Nho thuộc xã Long Hòa, Tam Thôn Hiệp thuộc xã Tam Thôn Hiệp có giá từ 21 - 40 triệu đồng/m2. Các tuyến đường thuộc xã Bình Khánh dao động từ 10-12 triệu đồng/m2. </p> <p>  Có thể thấy, tình trạng sốt đất tại Cần Giờ hiện nay không còn như trước đây, dù có thông tin làm cảng. Thị trường bất động sản chưa “vực dậy” kể từ đầu năm 2022 đến nay. Dù có một số nhóm đầu tư rao bán đất với giá khá rẻ nhưng thanh khoản thị trường chậm, khó ra hàng. </p> <p>  Chia sẻ về nhà đất Cần Giờ, một nhà đầu tư bất động sản lâu năm cho rằng, với hàng loạt dự án quy mô lớn cùng các thay đổi về hạ tầng giao thông, quy hoạch đang diễn ra như hiện nay, nhà đất Cần Giờ sẽ rất tiềm năng và chắc chắn còn biến động tích cực trong các năm tới. Tuy nhiên, ở thời điểm hiện tại, khi tình hình thị trường chung còn nhiều khó khăn khó có chuyện nhà đầu tư ồ ạt đổ tiền săn bất động sản như giai đoạn trước. </p> <p>  “Hiện tại, những nhà đầu tư dài hạn, không chịu áp lực tài chính sẽ không vội ra hàng ngay thời điểm này. Ngược lại, những nhà đầu tư đang có nhu cầu bán lại, muốn thổi giá bất động sản để tạo cơn sốt ở khu vực này cũng không phải chuyện dễ dàng”, vị này cho hay. </p>


</div>

</div>

</div>
</div>

`


    return (
        <Stack
            width={'100%'}
            height={'fit-content'}
            alignItems={'center'}
            marginTop={'20px'}
            paddingLeft={'10px'}
            paddingRight={'10px'}
        >
            <Stack
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    maxWidth: '1200px',
                    minWidth: '390px',

                }}

                direction={'column'}
            >

                <Typography
                    alignSelf={'start'}
                    sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        margin: '5px'
                    }}

                >Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023</Typography>
                <Stack
                    direction={'row'}
                    marginTop={3}
                >
                    <Stack
                        width={matches ? '70%' : '100%'}



                    >

                        <div dangerouslySetInnerHTML={{ __html: htmlContent }}
                            style={{
                                textAlign: 'justify'
                            }}
                        />
                        <Typography alignSelf={'end'}
                            fontWeight={600}
                        >Nguyễn Văn A</Typography>

                        <Typography
                            marginTop={2}
                            fontSize={'20px'}
                            fontWeight={600}
                        >Bài viết khác</Typography>

                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />
                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />
                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />
                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />

                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />
                    </Stack>

                    <Stack
                        display={matches ? 'block' : 'none'}
                        width={'30%'}

                        justifyContent={'center'}
                        alignItems={'center'}
                    >

                        <Stack
                            width={'85%'}
                            alignSelf={'center'}
                            marginLeft={'20px'}
                            sx={{
                                borderRadius: '10px',
                                border: '1px #ccc solid',
                                padding: '5px',
                                paddingLeft: '10px',
                                paddingRight: '10px'

                            }}
                        >

                            <Typography
                                sx={{
                                    fontWeight: '600'
                                }}
                            >Bài viết được xem nhiều nhất</Typography>

                            {newstags.map((news, index) => (
                                <NewsTag
                                    key={index}
                                    index={index}
                                    title={news.title}
                                />
                            ))}

                        </Stack>

                    </Stack>

                </Stack>

            </Stack>
        </Stack>
    )
}

export default DetailBlog
