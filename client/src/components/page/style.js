import Styled from 'styled-components';

const successColor = "#28a745";
const dangerColor = "#ed0103";


const EChartCard = Styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    .card-chunk{
        width: 50%;
        flex: 0 0 50%;
    }
    @media only screen and (max-width: 379px){
        .card-chunk{
            width: 100%;
            flex: 0 0 100%;
            h1{
                margin-bottom: 0;
            }
            p{
                margin: 5px 0 20px 0;
            }
        }
    }
    .chartjs-tooltip {
        min-width: 132px !important;
    }
`;

const CardBarChart2 = Styled.div`
    @media only screen and (max-width: 379px){
        text-align: center
    }
    h1{
        margin-bottom: 5px;
    }
    @media only screen and (max-width: 1500px){
        h1{
            font-size: 22px;
        }
    }
    & > span{
        font-size: 14px;
        color: rgb(134, 142, 174);
    }
    p{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 21px 0 0 0;
        @media only screen and (max-width: 379px){
            justify-content: center;
        }
        .growth-upward, .growth-downward{
            display: inline-flex;
            align-items: center;
            padding-right: 10px;
            font-weight: 600;

            svg{
                width: 15px;
            }
        }
        .growth-upward{
            color: ${successColor};
            svg{
                color: ${successColor};
            }
        }
        .growth-downward{
            color: ${dangerColor};
            svg{
                color: ${dangerColor};
            }
        }
        span{
            font-size: 13px;
            display: inline-block;
        }
    }
`;

const Card = Styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    color: #272b41;
    font-size: 14px;
    line-height: 1.5715;
    list-style: none;
    position: relative;
    background: #fff;
    border-radius: 10px;
`;

const CardBody = Styled.div`
    position: relative;
    padding: 25px;
`;

export {
  Card,
  CardBody,
  EChartCard,
  CardBarChart2,
};
