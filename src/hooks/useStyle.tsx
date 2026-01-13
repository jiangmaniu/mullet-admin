import { useEmotionCss } from '@ant-design/use-emotion-css'

const useStyle = () => {
  // input addon + select 下拉样式
  const addonFormItemClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-input,.ant-input-number': {
        border: 'none !important'
      },
      '.ant-input:hover,.ant-input-number:hover': {
        borderColor: '#fff !important'
      },
      '.ant-input-group-addon,.ant-input-number-group-addon': {
        border: 'none !important',
        background: '#fff !important',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: '50%',
          width: 1,
          height: 12,
          background: '#d9d9d9',
          transform: 'translateY(-50%)'
        }
      },
      '.ant-input-group-wrapper,.ant-input-number-group-wrapper': {
        border: '1px solid #d9d9d9',
        borderRadius: 7
      },
      '.ant-input-group-wrapper:hover,.ant-input-number-group-wrapper:hover': {
        borderColor: '#9C9C9C'
      },
      '.ant-input:focus-within,.ant-input-affix-wrapper:focus-within,.ant-input-number:focus-within,.ant-input-number-affix-wrapper:focus-within':
        {
          boxShadow: 'none !important'
        },
      '.ant-input-number:focus,.ant-input:focus': {
        boxShadow: 'none !important'
      },
      '.ant-input-affix-wrapper,.ant-input-number-affix-wrapper': {
        border: 'none !important'
      }
    }
  })

  // 点差模式输入框样式
  const spreadAddonClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-form-item-control > div:first-child': {
        border: '1px solid #d9d9d9',
        borderRadius: 7,
        '&:hover': {
          borderColor: '#9C9C9C'
        },
        '& > div': {
          // flex: 1
        }
      },
      '.addonbefore-wrapper-child': {
        position: 'relative',
        '.ant-form-item-control': {
          border: 'none'
        },
        '.ant-form-item-control > div:first-child': {
          border: 'none'
        },
        '&::after': {
          position: 'absolute',
          top: '50%',
          left: '-12px',
          width: 1,
          height: 15,
          background: '#d9d9d9',
          content: "''",
          transform: 'translateY(-50%)'
        }
      },
      '.ant-input-affix-wrapper:focus-within,.ant-input-number:focus-within': {
        border: 'none !important',
        boxShadow: 'none !important'
      }
    }
  })

  // 表格展开行自定义样式
  const customTableExpandRowName = useEmotionCss(({ token }) => {
    return {
      '.ant-table-content > table': {
        borderSpacing: '0px 10px'
      },
      '.ant-table-row': {
        position: 'relative',
        '& > .ant-table-cell': {
          '&:not(:first-child,:last-child)': {
            borderLeftWidth: '0px !important',
            borderRightWidth: '0px !important'
          },
          '&:first-child': {
            borderRightWidth: '0px !important',
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12
          },
          '&:last-child': {
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            borderLeftWidth: '0 !important'
          }
        },
        '&.custom-expand-row': {
          '& > td': {
            '&:after': {
              content: '""',
              border: '1px solid #f0f0f0',
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              zIndex: 0,
              top: '50%',
              transform: 'translateY(-50%)'
            },
            '&:not(:first-child,:last-child):after': {
              borderLeftWidth: 0,
              borderRightWidth: 0
            },
            '&:first-child:after': {
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderRightWidth: 0
            },
            '&:last-child:after': {
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              borderLeftWidth: 0
            }
          },
          '&.ant-table-row-level-0 > td': {
            '&:first-child:after': {
              left: `0 !important`
            }
          },
          '&.ant-table-row-level-1 > td': {
            '&:first-child:after': {
              left: `22px !important`
            }
          },
          '&.ant-table-row-level-2 > td': {
            '&:first-child:after': {
              left: `44px !important`
            }
          },
          '&.ant-table-row-level-3 > td': {
            '&:first-child:after': {
              left: `66px !important`
            }
          },
          '&.ant-table-row-level-4 > td': {
            '&:first-child:after': {
              left: `88px !important`
            }
          },
          '&.ant-table-row-level-5 > td': {
            '&:first-child:after': {
              left: `110px !important`
            }
          },
          '&.ant-table-row-level-6 > td': {
            '&:first-child:after': {
              left: `132px !important`
            }
          },
          '&.ant-table-row-level-7 > td': {
            '&:first-child:after': {
              left: `154px !important`
            }
          },
          '&.ant-table-row-level-8 > td': {
            '&:first-child:after': {
              left: `176px !important`
            }
          },
          '&.ant-table-row-level-9 > td': {
            '&:first-child:after': {
              left: `198px !important`
            }
          },
          '&.ant-table-row-level-10 > td': {
            '&:first-child:after': {
              left: `220px !important`
            }
          }
        }
      },
      '.ant-table-row > td > a,.ant-table-row-expand-icon': {
        position: 'relative',
        zIndex: 18
      },
      '.ant-table-cell-row-hover': {
        background: 'none !important',
        '&:after': {
          background: '#fafafa !important'
        }
      },
      // 针对columns最后一个使用fixed:'right'提高层级
      '.ant-table-cell-fix-right-first': {
        zIndex: '20 !important'
      },
      '.ant-table-tbody .option-column': {
        background: '#fff !important'
      }
    }
  })

  const recordListClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-table-thead > tr > th': {
        fontSize: '12px !important',
        color: 'var(--color-text-weak) !important',
        background: '#fff !important',
        fontWeight: '500 !important'
      }
    }
  })

  return {
    addonFormItemClassName,
    spreadAddonClassName,
    customTableExpandRowName,
    recordListClassName
  }
}

export default useStyle
